import React, { Component, ErrorInfo, ReactNode } from "react";
import { Box, Typography, Button, Container } from "@mui/material";
import { useI18n } from "../contexts/I18nContext";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      error,
      errorInfo,
    });
    // Log error to error reporting service
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <ErrorFallback
          error={this.state.error}
          errorInfo={this.state.errorInfo}
        />
      );
    }

    return this.props.children;
  }
}

interface ErrorFallbackProps {
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

const ErrorFallback: React.FC<ErrorFallbackProps> = ({ error, errorInfo }) => {
  const { t } = useI18n();

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          textAlign: "center",
          p: 3,
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          {t("common.error")}
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          {t("error.boundary")}
        </Typography>
        {process.env.NODE_ENV === "development" && (
          <Box
            sx={{
              mt: 2,
              p: 2,
              bgcolor: "background.paper",
              borderRadius: 1,
              textAlign: "left",
              maxHeight: "200px",
              overflow: "auto",
            }}
          >
            <Typography variant="subtitle2" color="error">
              {error?.toString()}
            </Typography>
            <Typography variant="caption" component="pre" sx={{ mt: 1 }}>
              {errorInfo?.componentStack}
            </Typography>
          </Box>
        )}
        <Button
          variant="contained"
          color="primary"
          onClick={() => window.location.reload()}
          sx={{ mt: 3 }}
        >
          {t("common.reload")}
        </Button>
      </Box>
    </Container>
  );
};

export default ErrorBoundary;
