const LoadingSpinner = ({ label = 'Loading...', className = '' }) => (
  <div className={`flex items-center justify-center py-20 ${className}`.trim()}>
    <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-yellow-500" />
    <span className="ml-3 text-yellow-500">{label}</span>
  </div>
);

export default LoadingSpinner;
