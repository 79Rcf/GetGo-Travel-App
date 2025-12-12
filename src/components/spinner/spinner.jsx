
const TailwindSpinner = ({ size = "medium" }) => {
    const sizeClasses = {
      small: "w-6 h-6 border-2",
      medium: "w-12 h-12 border-4",
      large: "w-16 h-16 border-6"
    };
  
    return (
      <div className={`${sizeClasses[size]} border-gray-200 border-t-blue-500 rounded-full animate-spin`}></div>
    );
  };
  
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <Header onSearch={handleSearch} />
        <div className="flex flex-col justify-center items-center h-64">
          <TailwindSpinner size="large" />
          <p className="mt-4 text-xl">Loading data for {countryName}...</p>
        </div>
      </div>
    );
  }

  export default TailwindSpinner;