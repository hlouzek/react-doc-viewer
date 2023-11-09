import React from "react";
import styled from "styled-components";
import { DocRenderer, IStyledProps } from "../..";
import PDFPages from "./components/pages/PDFPages";
import PDFControls from "./components/PDFControls";
import { PDFProvider } from "./state";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';

const PDFRenderer: DocRenderer = ({ mainState }) => {

  return (
    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
      <PDFProvider mainState={mainState}>
        <Container id="pdf-renderer" data-testid="pdf-renderer">
          <Viewer fileUrl={require('./faktura.pdf')} />          
          <PDFControls />
          <PDFPages />
        </Container>
      </PDFProvider>
    </Worker>

  );
};

export default PDFRenderer;

PDFRenderer.fileTypes = ["pdf", "application/pdf"];
PDFRenderer.weight = 0;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow-y: auto;

  /* width */
  &::-webkit-scrollbar {
    ${(props: IStyledProps) => {
    return props.theme.disableThemeScrollbar ? "" : "width: 10px";
  }};
  }
  /* Track */
  &::-webkit-scrollbar-track {
    /* background: ${(props: IStyledProps) => props.theme.secondary}; */
  }
  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: ${(props: IStyledProps) => props.theme.tertiary};
  }
  /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
    background: ${(props: IStyledProps) => props.theme.primary};
  }
`;
