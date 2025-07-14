// Function to report web vitals performance metrics
const reportWebVitals = onPerfEntry => {
  // Check if the onPerfEntry is a function and exists
  if (onPerfEntry && onPerfEntry instanceof Function) {
    // Dynamically import web-vitals library and use its functions to measure different metrics
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      // Measure Cumulative Layout Shift (CLS)
      getCLS(onPerfEntry);
      
      // Measure First Input Delay (FID)
      getFID(onPerfEntry);
      
      // Measure First Contentful Paint (FCP)
      getFCP(onPerfEntry);
      
      // Measure Largest Contentful Paint (LCP)
      getLCP(onPerfEntry);
      
      // Measure Time to First Byte (TTFB)
      getTTFB(onPerfEntry);
    });
  }
};

// Export the function to be used in the application
export default reportWebVitals;
