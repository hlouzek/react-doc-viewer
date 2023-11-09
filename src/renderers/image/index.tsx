import React from "react";
import styled from "styled-components";
import { DocRenderer } from "../..";

const ImageProxyRenderer: DocRenderer = (props) => {
  const {
    mainState,
    mainState: { currentDocument, renderPage, rendererRect},
    children,
  } = props;
  const _height = (rendererRect?.height || 100) - 100;
  const _width = (rendererRect?.width || 100) - 100;

  if (!currentDocument) return null;

  const canvasLayer: JSX.Element = (
    <Container id="image-renderer" {...props}>
      {children || (
        <Img id="image-img" src={currentDocument.fileData as string} />
      )}
    </Container>
  )

  if (!renderPage) return canvasLayer;
  return renderPage({ mainState, canvasLayer, scale: 1, height: _height, width: _width });

};

export default ImageProxyRenderer;

ImageProxyRenderer.fileTypes = [];
ImageProxyRenderer.weight = 0;

const Container = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: #fff;
`;

const Img = styled.img`
  max-width: 95%;
  max-height: 95%;
`;
