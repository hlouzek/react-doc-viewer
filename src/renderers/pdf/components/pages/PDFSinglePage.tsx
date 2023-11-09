import React, { useState, FC, useContext, useMemo, memo } from "react";
import { Page } from "react-pdf";
import styled from "styled-components";
import { IStyledProps } from "../../../..";
import { useTranslation } from "../../../../hooks/useTranslation";
import { PDFContext } from "../../state";
import { setOrigin } from '../../state/actions';
import { Viewer } from '@react-pdf-viewer/core';

interface Props {
  pageNum?: number;
}

const PDFSinglePage: FC<Props> = ({ pageNum }) => {
  const {
    state: { mainState, paginated, zoomLevel, numPages, currentPage, originWidth, originHeight },
    dispatch
  } = useContext(PDFContext);
  const { t } = useTranslation();

  const currentDocument = mainState?.currentDocument || null;
  console.log("🚀 ~ file: PDFSinglePage.tsx:22 ~ currentDocument:", currentDocument)
  const rendererRect = mainState?.rendererRect || null;
  const renderPage = mainState?.renderPage || null;
  const _pageNum = pageNum || currentPage;
  const _height = (rendererRect?.height || 100) - 100;
  const _width = (rendererRect?.width || 100) - 100;
  const scale = _width / (originWidth || _width);

  const handleLoadSuccess = (pageData: any) => {
    const { originalWidth, originalHeight } = pageData;
    dispatch(setOrigin(originalWidth, originalHeight));
  }

  const canvasLayer = (
    <PageWrapper id="pdf-page-wrapper" last={_pageNum >= numPages}>
      {!paginated && (
        <PageTag id="pdf-page-info">
          {t("pdfPluginPageNumber", {
            currentPage: _pageNum,
            allPagesCount: numPages,
          })}
        </PageTag>
      )}

      {/* <Page
        pageNumber={_pageNum}
        scale={zoomLevel}
        height={_height}
        width={_width}
        loading={t("pdfPluginLoading")}
        onLoadSuccess={handleLoadSuccess as any} // Cast as 'any' if PageProps does not align with expected signature
      /> */}

    </PageWrapper>
  );

  return useMemo(() => canvasLayer, []);

  // if (!renderPage) return canvasLayer;
  // return renderPage({ mainState, canvasLayer, scale: zoomLevel * scale, pageNum: _pageNum, height: _height, width: _width });
};

export default PDFSinglePage;

interface PageWrapperProps {
  last?: boolean;
}

const PageWrapper = styled.div<PageWrapperProps>`
  margin: 20px 0;
`;

const PageTag = styled.div`
  padding: 0 0 10px 10px;
  color: ${(props: IStyledProps) => props.theme.textTertiary};
  font-size: 14px;
  text-align: left;

  @media (max-width: 768px) {
    font-size: 10px;
  }
`;
