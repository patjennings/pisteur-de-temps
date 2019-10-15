import React, { Component } from 'react';

import {observer, inject} from "mobx-react";

const ErrorBoundary = inject("mainStore")(observer(class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
      // You can also log the error to an error reporting service
      console.log(error, errorInfo);
  }

    render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
	return <p className="text-muted">{this.props.mainStore.appStrings[this.props.mainStore.lang.toLowerCase()].error.main}</p>;
    }
    return this.props.children; 
  }
}));

export default ErrorBoundary;
