import React, { CSSProperties, forwardRef, memo } from "react";
import styled, { ThemeProvider } from "styled-components";
import { HeaderBar } from "./components/HeaderBar";
import { ProxyRenderer } from "./components/ProxyRenderer";
import { defaultTheme } from "./defaultTheme";
import { AvailableLanguages } from "./i18n";
import {
  DocRenderer,
  DocViewerRef,
  IConfig,
  IDocument,
  IRenderPage,
  ITheme,
} from "./models";
import { DocViewerRenderers } from "./renderers";
import { DocViewerProvider } from "./store/DocViewerProvider";

export interface DocViewerProps {
  documents: IDocument[];
  className?: string;
  style?: CSSProperties;
  config?: IConfig;
  theme?: ITheme;
  pluginRenderers?: DocRenderer[];
  prefetchMethod?: string;
  requestHeaders?: Record<string, string>;
  initialActiveDocument?: IDocument;
  language?: AvailableLanguages;
  activeDocument?: IDocument;
  onDocumentChange?: (document: IDocument) => void;
  renderPage?: (props: IRenderPage) => JSX.Element;
}

const DocViewer = forwardRef<DocViewerRef, DocViewerProps>((props, ref) => {
  const { documents, theme, children } = props;

  if (!documents) {
    throw new Error("Please provide an array of documents to DocViewer!");
  }
  return (
    <DocViewerProvider
      ref={ref}
      pluginRenderers={DocViewerRenderers}
      {...props}
    >
      <ThemeProvider
        theme={theme ? { ...defaultTheme, ...theme } : defaultTheme}
      >
        <Container id="react-doc-viewer" data-testid="react-doc-viewer">
          <HeaderBar />
          <ProxyRenderer />
        </Container>
      </ThemeProvider>
    </DocViewerProvider>
  );
});

export default DocViewer;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: #ffffff;
  width: 100%;
  height: 100%;
`;
