import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';

function ImageInTable(props) {
    const { src, height, alt } = props;
    const [showImg, setShowImg] = useState(false);

    if (src) return (
        <React.Fragment>
            <img
                src={src}
                alt={alt ? alt : "image"}
                height={height ? height : "40"}
                style={{ cursor: "pointer" }}
                onClick={() => setShowImg(true)}
            ></img>
            <Modal isOpen={showImg} toggle={() => setShowImg(false)}>
                <ModalHeader toggle={() => setShowImg(false)}>
                </ModalHeader>
                <ModalBody>
                    <img
                        src={src}
                        alt={alt ? alt : "image"}
                        style={{ width: "100%" }}
                    ></img>
                </ModalBody>
            </Modal>
        </React.Fragment>

    )
    else return null;
}

export default ImageInTable;