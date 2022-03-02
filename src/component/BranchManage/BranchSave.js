/* eslint-disable react-hooks/exhaustive-deps */
import ReactTagInput from "@pathofdev/react-tag-input";
import "@pathofdev/react-tag-input/build/index.css";
import produce from "immer";
import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, Row, Table } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import swal from 'sweetalert';
import { SwalCommon } from '../../constants/SwalCommon';
import { ValidationText } from "../../constants/Validation";
import BranchService from "../../services/BranchService";
import CompanyService from "../../services/CompanyService";
import { uploadByPresignedUrl } from "../../services/s3UploadService";
import { fetchFileFromUrl } from '../../utils/common';
import ImagePreview from '../common/ImagePreview';
import MapModal from "./ModalMap";

export default function BranchSave(props) {

    const [showDD, setShowDD] = useState(false)
    const [term, setTerm] = useState("")
    const [searchResult, setSearchResult] = useState([])

    const [company, setCompany] = useState({
        companyId: "",
        storeCompanyCode: "",
        storeCompanyName: "",
        nextBranchCode: "",
        companyRegName: "",
        companyRegNumber: "",
    })

    const [branch, setBranch] = useState({
        id: props.match.params.id,
        branchName: "",
        addressSimple: "",
        addressDetailed: "",
        phone: "",
        announcement: "",
        businessInfo: "",
        refundPolicy: "",
        keywords: [],
        companyId: "1",
        imageCount: 0,
        lstImg: [],
        latitude: null,
        longtitude: null
    })

    const [mainUrl, setMainUrl] = useState([])
    const [subUrl, setSubUrl] = useState([])

    const [strCoordinate, setStrCoordinate] = useState()

    const history = useHistory();
    const [isCreateAction, setScreenAction] = useState(true);

    const [showModal, setShowModal] = useState(false);
    const [showLoading, setShowLoading] = useState(false);


    useEffect(() => {
        const { id } = props.match.params
        if (id) {
            setScreenAction(false)

            async function fetchBranch() {
                const responseBranch = await BranchService.getBranch(id).then(response => {
                    let resBranch = response.data
                    let resCompany = resBranch.company

                    setBranch({
                        ...branch,
                        branchName: resBranch.name,
                        addressSimple: resBranch.addressSimple,
                        addressDetailed: resBranch.addressDetail,
                        phone: resBranch.phone,
                        announcement: resBranch.announcement,
                        businessInfo: resBranch.businessInformation,
                        refundPolicy: resBranch.refundPolicy,
                        keywords: resBranch.keywords,
                        companyId: resCompany.id,
                        latitude: resBranch.latitude,
                        longitude: resBranch.longitude,
                    })

                    setCompany({
                        companyId: resCompany.id,
                        storeCompanyCode: resCompany.code,
                        storeCompanyName: resCompany.brandName,
                        nextBranchCode: resCompany.code + resBranch.code,
                        companyRegName: resCompany.registrationName,
                        companyRegNumber: resCompany.registrationNumber
                    })


                    //setStrKeywords(resBranch.keywords)
                    setTags(resBranch.keywords)
                    setStrCoordinate({ lat: resBranch.latitude, lng: resBranch.longitude })

                    return resBranch
                });

                await fetchPhoto(responseBranch)
            }

            fetchBranch()
        }
    }, [props.match.params.id])

    async function fetchPhoto(data) {
        if (data.subPhotos && data.subPhotos.length > 0) {
            // Main Photo
            let file_name = data.subPhotos[0].split(/[\s/]+/).pop();
            let main_object = await fetchFileFromUrl(data.subPhotos[0], file_name);
            setMainUrl([].concat(main_object))
            // Sub Photo
            let sub_object = await Promise.all(data.subPhotos.slice(1, data.subPhotos.length).map((element => {
                return fetchFileFromUrl(element, element.split(/[\s/]+/).pop())
            })))
            setSubUrl([].concat(sub_object))
        }
    }

    // function fetchFileFromUrl(url, fileName) {
    //     return axios.get(url, { responseType: 'blob', headers: { cacheControl: "no-cache", pragma: "no-cache", expires: '0' } }).then(response => {
    //         return new File([response.data], fileName);
    //     });
    // }

    useEffect(() => {
        var lstImage = []
            .concat(mainUrl.map(main => main.name))
            .concat(subUrl.map(sub => sub.name))
        setBranch({ ...branch, imageCount: (mainUrl.length + subUrl.length), lstImg: lstImage })
    }, [mainUrl, subUrl])

    function handleCancelEdit() {
        history.goBack();
    }

    const [isValidForm, setFormValidation] = useState(undefined);

    function handleSave(e) {
        e.preventDefault()
        const form = e.currentTarget;

        if (!form.checkValidity()) {
            swal(SwalCommon.ALERT_MISSING_DATA)
            setFormValidation(false)
        } else {
            setFormValidation(true)
            BranchService.saveBranch(branch).then(response => {
                if (response.status === 200) {
                    var lstS3Url = response.data.urls
                    // upload image
                    var files = [].concat(mainUrl).concat(subUrl);

                    files.forEach((item, index) => {
                        uploadByPresignedUrl(lstS3Url[index], item)
                    });

                    swal({
                        text: "저장이 완료되었습니다.",
                        icon: "success",
                        button: "확인",
                    }).then(() => {
                        history.push(`/branches/${response.data.id}`)
                    });
                }
            }).catch((err) => {
                if (err.response.data.errorCode === 16000) {
                    swal({ ...SwalCommon.COMMON_FAILED, text: '위치가 없습니다. 다시 시도하십시오.' })
                }
                else {
                    swal(SwalCommon.COMMON_FAILED)
                }
            })
        }
    }

    function handleUpPhoto(e) {
      var { files, id } = e.target;
      if (files && files.length > 0) {
        if (id === "mainPhoto") {
          if (files[0].size <= 3145728) {
            setMainUrl([].concat(files[0]));
          } else {
            swal(SwalCommon.ALERT_CHECK_IMAGE);
          }
        }
      } else {
        let fileDatas = Object.entries(files).map((file) => {
          if (file.size <= 3145728) {
            return file[1];
          } else {
            swal(SwalCommon.ALERT_CHECK_IMAGE);
          }
        });
        if (subUrl.length + fileDatas.length <= 5) {
          setSubUrl(subUrl.concat(fileDatas));
        }
      }
    }


    function handleSearchCompany(event) {
        event.preventDefault()
        setShowLoading(true);
        CompanyService.searchBrand(term).then(response => {
            if (response.status === 200 && response.data.content.length > 0) {
                setShowDD(true)
                setSearchResult(response.data.content)
            }
        }).then(() => {
            setShowLoading(false)
        })
    }

    function clickOutsideBrandName() {
        setShowDD(false)
    }

    function handleSelectCompany(company) {
        setCompany(company)
        setBranch({ ...branch, companyId: company.companyId })
        setSearchResult([])
    }
    const [tags, setTags] = React.useState([])
    function handleChangeKeywords(tags) {
        setTags(tags)
        setBranch(produce(draft => {
            draft.keywords = tags
        }))
    }

    function handleChange(event) {
        const { id, value } = event.target
        const nestedIds = id.split(".")

        setBranch(produce(draft => {
            setValueByPath(draft, nestedIds, value)
        }))
    }

    const setValueByPath = (obj, path, value) => {
        if (path.length === 1) {
            obj[path] = value
            return
        }

        return setValueByPath(obj[path[0]], path.slice(1), value)
    }

    function handleRemoveMainImage(index) {
        setMainUrl([])
        document.getElementById("mainPhoto").value = ""
    }

    function handleRemoveSubImage(index) {
        let newLst = [].concat(subUrl);
        newLst.splice(index, 1);
        setSubUrl(newLst);
    }

    function handleMainPhotoInput() {
        document.getElementById("mainPhoto").click();
    }

    function handleSubPhotoInput() {
        document.getElementById("subPhoto").click();
    }

    function handleSaveCoordinate(coordinates) {
        setBranch({ ...branch, latitude: coordinates.lat, longitude: coordinates.lng })
        setStrCoordinate(coordinates)
        setShowModal(false)
    }

    function handleClearCoordinate() {
        setBranch({ ...branch, latitude: null, longitude: null })
        setStrCoordinate()
    }

    return (
        <Container fluid onClick={clickOutsideBrandName}>
            <h4 className="mt-5 mb-3">{(isCreateAction) ? "지점 등록" : "지점 정보 수정"}</h4>
            <Form onSubmit={handleSave} noValidate className={`${(isValidForm === false) ? ' was-validated' : ''}`}>
                <Table className="table-form">
                    <tbody>
                        <tr>
                            <td>브랜드명</td>
                            <td className="text-left">
                                {isCreateAction &&
                                    <Form.Group controlId="term" required className="dropdown">
                                        <Form.Control
                                            onChange={(e) => {
                                                isCreateAction && setTerm(e.target.value)
                                            }}
                                            list="searchRes"
                                            className="col-3 d-inline" value={term} required />
                                        <div hidden={!showDD} id="myDropDown" className="dropdown-content col-3">
                                            {searchResult.map(res => <p
                                                onClick={() => handleSelectCompany(res)}>{res.companyRegName}</p>)}
                                        </div>
                                        <span>
                                            <Button style={{ marginLeft: "0.5rem" }} variant="org"
                                                onClick={handleSearchCompany}>
                                                <span hidden={showLoading}>검색</span>
                                                <span class="spinner-border" hidden={!showLoading}></span>
                                            </Button>
                                            <span hidden={!(company.storeCompanyCode && company.companyRegName)}
                                                style={{ marginLeft: "0.5rem" }}>
                                                {`[${company.storeCompanyCode}] ${company.companyRegName}`}
                                            </span>
                                        </span>
                                        <div className="text-left invalid-feedback"
                                            style={{ color: "red" }}>{ValidationText.BrandName}</div>
                                    </Form.Group>
                                }
                                {!isCreateAction && <span hidden={!(company.storeCompanyCode && company.companyRegName)}>
                                    {`[${company.storeCompanyCode}] ${company.companyRegName}`}
                                </span>}
                            </td>
                        </tr>
                        <tr>
                            <td>지점 코드</td>
                            <td>
                                <Form.Control className="col-3" plaintext={!isCreateAction} value={company.nextBranchCode} required />
                            </td>
                        </tr>
                        <Form.Group as="tr" controlId="branchName">
                            <Form.Label as="td">지점명</Form.Label>
                            <td>
                                <Form.Control onChange={isCreateAction && handleChange} plaintext={!isCreateAction}
                                    className="col-3" value={branch.branchName} required />
                                <div className="text-left invalid-feedback"
                                    style={{ color: "red" }}>{ValidationText.BranchName}</div>
                            </td>
                        </Form.Group>
                        <tr>
                            <td>지점 대표 사진</td>
                            <td>
                                <Form.File.Input hidden={true} id="mainPhoto" onChange={handleUpPhoto}
                                    accept=".png, .jpg, .jpeg" />
                                <div className="d-flex align-items-center" required>
                                    <div style={{ marginRight: '1em' }}>
                                        <Button className="btn btn-secondary" id='button' onClick={handleMainPhotoInput}>파일
                                        선택</Button>
                                    </div>

                                    {mainUrl.length > 0 &&
                                        <ImagePreview src={mainUrl[0]} handleRemoveImage={handleRemoveMainImage} />
                                    }
                                </div>
                                <div className="text-left invalid-feedback"
                                    style={{ color: "red", display: (isValidForm === false && mainUrl.length <= 0) ? "block" : "none" }}
                                >{ValidationText.MainPhoto}</div>
                            </td>
                        </tr>
                        <tr>
                            <td>지점 추가 사진</td>
                            <td>
                                <Form.File.Input hidden={true} id="subPhoto" multiple onChange={handleUpPhoto}
                                    accept=".png, .jpg, .jpeg" />
                                <div className="d-flex align-items-center">
                                    <div style={{ marginRight: '1em' }} required>
                                        <Button className="btn btn-secondary" id='button' onClick={handleSubPhotoInput}>파일
                                        선택</Button>
                                    </div>
                                    {subUrl.length > 0 &&
                                        subUrl.map((item, index) => {
                                            return <><ImagePreview index={index} src={item}
                                                handleRemoveImage={handleRemoveSubImage} /> &nbsp; &nbsp; </>
                                        })
                                    }
                                </div>
                                <div className="text-left invalid-feedback"
                                    style={{ color: "red" }}>{ValidationText.Images}</div>
                            </td>
                        </tr>
                        <Form.Group as="tr" controlId="addressSimple">
                            <Form.Label as="td">간단 주소</Form.Label>
                            <td>
                                <Form.Control onChange={handleChange} className="col-3" value={branch.addressSimple}
                                    required />
                                <div className="text-left invalid-feedback"
                                    style={{ color: "red" }}>{ValidationText.Address}</div>
                            </td>
                        </Form.Group>
                        <Form.Group as="tr" controlId="addressDetailed">
                            <Form.Label as="td">상세 주소</Form.Label>
                            <td>
                                <Form.Control onChange={handleChange} className="col-3" value={branch.addressDetailed}
                                    required />
                                <div className="text-left invalid-feedback"
                                    style={{ color: "red" }}>{ValidationText.Address}</div>
                            </td>
                        </Form.Group>
                        <Form.Group as="tr" controlId="phone">
                            <Form.Label as="td">지점 전화번호</Form.Label>
                            <td>
                                <Form.Control onChange={handleChange} className=" col-3" value={branch.phone} required />
                                <div className="text-left invalid-feedback"
                                    style={{ color: "red" }}>{ValidationText.Phone}</div>
                            </td>
                        </Form.Group>
                        <tr>
                            <td>지점 상세정보</td>
                            <td>
                                <Form.Group as={Row} controlId="announcement">
                                    <Form.Label className="col-1" as={Col}>공지사항</Form.Label>
                                    <Col className="col-3">
                                        <Form.Control onChange={handleChange} value={branch.announcement} />
                                        <div className="text-left invalid-feedback"
                                            style={{ color: "red" }}>{ValidationText.Notice}</div>
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} controlId="businessInfo">
                                    <Form.Label className=" col-1" as={Col}>영업정보</Form.Label>
                                    <Col className="col-3">
                                        <Form.Control
                                            as="textarea"
                                            rows={4}
                                            style={{ whiteSpace: "pre-line" }}
                                            onChange={handleChange}
                                            value={branch.businessInfo} required />
                                        <div className="text-left invalid-feedback"
                                            style={{ color: "red" }}>{ValidationText.BusinessInfo}</div>
                                    </Col>
                                </Form.Group>
                                <Row>
                                    <Col className=" col-1">사업자 정보</Col>
                                    <Col className="col-3">
                                        <Form.Control as="textarea" readOnly style={{ whiteSpace: "pre-line" }}
                                            value={`사업자등록상호명: ${company.companyRegName}
                                        사업자등록번호: ${company.companyRegNumber}`} />
                                    </Col>
                                </Row>
                            </td>
                        </tr>
                        <Form.Group as="tr" controlId="refundPolicy">
                            <Form.Label as="td">지점 환불정책</Form.Label>
                            <td>
                                <Form.Control className="col-3" onChange={handleChange} value={branch.refundPolicy}
                                    required />
                                <div className="text-left invalid-feedback"
                                    style={{ color: "red" }}>{ValidationText.RefundPolicy}</div>
                            </td>
                        </Form.Group>
                        <Form.Group as="tr" controlId="keywords">
                            <Form.Label as="td">검색키워드</Form.Label>
                            <td>
                                {/*<Form.Control className="col-3" onChange={handleChangeKeywords} value={strKeywords} required/>*/}
                                <ReactTagInput tags={tags} onChange={(newTags) => handleChangeKeywords(newTags)} maxTags={10} placeholder=" " />
                                <div className="text-left invalid-feedback" style={{ color: "red" }}>{ValidationText.Keywords}</div>
                            </td>
                        </Form.Group>
                        <Form.Group as="tr" controlId="coordinate">
                            <Form.Label as="td">위도/경도</Form.Label>
                            <td>
                                <Form.Control className="col-3 d-inline"
                                    value={strCoordinate ? `${strCoordinate.lat}, ${strCoordinate.lng}` : ''} required />

                            &nbsp;
                            <Button variant="secondary" onClick={() => setShowModal(true)}>지도에서 찾기</Button>
                                {/* <Button hidden={!strCoordinate} variant="org" onClick={handleClearCoordinate}>맑은</Button> */}

                                <div className="text-left invalid-feedback" style={{ color: "red" }}>{ValidationText.Coordinate}</div>
                            </td>

                        </Form.Group>
                    </tbody>
                </Table>

                <div className="d-flex justify-content-end">
                    <Button variant="secondary" onClick={handleCancelEdit}>취소</Button>
                    <Button type="submit" style={{ marginLeft: "0.5rem" }} variant="org">저장</Button>
                </div>
            </Form>
            <MapModal show={showModal} handleCloseModal={() => setShowModal(false)}
                handleSaveCoordinate={handleSaveCoordinate} latlong={strCoordinate} />
        </Container>

    )
}