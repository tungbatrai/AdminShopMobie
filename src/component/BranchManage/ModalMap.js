import { Button, Modal } from "react-bootstrap";
import KakaoMap from "./../../component/KakaoMap/KakaoMap";
import { useState } from "react";

export default function ModalMap({
  show,
  handleCloseModal,
  handleSaveCoordinate,
  latlong,
}) {
  const [coorinate, setcoorinate] = useState();

  return (
    <Modal show={show} onHide={handleCloseModal} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>지점 주소</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <KakaoMap
          getPlaceCoordinate={(coordinate) => setcoorinate(coordinate)}
          latlong={latlong}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
          취소
        </Button>
        <Button variant="org" onClick={() => handleSaveCoordinate(coorinate)}>
          저장
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
