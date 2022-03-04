import React, { useState, useEffect } from "react"
import { userActions } from "../../actions/user.action";
import { useDispatch, useSelector } from "react-redux";

import { Button, Col, Container, Form, Row } from "react-bootstrap"
import { ImageItem } from "../common/ListImageSection"
import { Link } from "react-router-dom";
import { ValidationText } from "../../constants/Validation";
import swal from "sweetalert";
import { SwalCommon } from "../../constants/SwalCommon";

const styles = {
    section: { marginTop: "70px" },
    sectionHead: { textAlign: "center" },
    sectionFoot: { textAlign: "center", marginTop: "1rem", fontSize: ".75em" },
    sectionBody: { marginTop: "1rem" },
    logo: { width: "100px" },
    title: { marginTop: "1rem" },
    button: { width: "100%", background: "red", borderColor: "red", color: "#FFFFFF" }
}

function Login() {

    var initState = {
        email: { text: "", isValid: true },
        password: { text: "", isValid: true }
    }
    const dispatch = useDispatch()
    const [form, setForm] = useState(initState);
    const [validated, setValidated] = useState(false);

    // selector
    const authen = useSelector(state => state.authentication);

    useEffect(() => {
        if (!authen.loggedIn && authen.error !== undefined) {
            switch (authen.error) {
                case '400':
                    setForm({ ...form, password: { text: form.password.text, isValid: false } });
                    break;
                case '404':
                    setForm({ ...form, password: { email: { text: form.email.text, isValid: false } } });
                    break;
                case '401':
                    swal(SwalCommon.COMMON_FAILED)
                    break;
                default:
                    //alert('Please check your input again!')
                    swal(SwalCommon.COMMON_FAILED)
                    break;
            }
        }
    }, [authen])

    useEffect(() => {
        // dispatch(userActions.logout());
    }, [dispatch])

    function handleChange(e) {
        const { id, value } = e.target;
        setForm(() => ({ ...form, [id]: { text: value, isValid: form[id].isValid } }))
    }

    function handleOnSubmit(e) {
        let formSubmit = e.currentTarget;
        console.log(e)
        e.preventDefault()
        e.stopPropagation()
        if (!formSubmit.checkValidity()) {
            setValidated(true)
        }
       else {
            dispatch(userActions.login(form.email.text, form.password.text));
        }
    }

    return (
        <>
            <Container>
                <Row className="justify-content-md-center" style={styles.section}>
                    <Col style={styles.sectionHead} xs={12}>
                        <ImageItem style={styles.logo} className="align-middle" />
                        <h5 style={styles.title}>Login Admin</h5>
                    </Col>
                    <Col style={styles.sectionBody} xs={{ span: 4 }}>
                        <Form style={styles.form} onSubmit={handleOnSubmit} noValidate className={`${(validated === true) ? ' was-validated' : ''}`}>
                            <Form.Group>
                                <Form.Label>User Name</Form.Label>
                                <Form.Control type="email"
                                //  required placeholder="아이디를 입력해주세요." 
                                id="email" onChange={handleChange} />
                                {/* <div className="text-left invalid-feedback" style={{ color: "red" }}>{ValidationText.Email}</div> */}
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Pass</Form.Label>
                                <Form.Control type="password" 
                                //required pattern={ValidationText.RequiredPassword}  placeholder="비밀번호를 입력해주세요."
                                id="password" onChange={handleChange} />
                                {/* <div className="text-left invalid-feedback" style={{ color: "red" }}>{ValidationText.Password}</div> */}
                            </Form.Group>
                            <Button variant="primary" type="submit" style={styles.button}>
                                submit
                            </Button>
                        </Form>
                    </Col>
                    <Col style={styles.sectionFoot} xs={12}>
                        <Link to="/password/forgot">Forgot pass?</Link>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Login