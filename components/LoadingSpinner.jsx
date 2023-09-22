

const LoadingSpinner = () => {
  return (
    <div className="animate-spin inline-block w-6 h-6 border-[3px] border-current border-t-transparent text-black-600 mt-10 rounded-full" role="status" aria-label="loading">
  <span className="sr-only">Loading...</span>
</div>
  )
}

export default LoadingSpinner