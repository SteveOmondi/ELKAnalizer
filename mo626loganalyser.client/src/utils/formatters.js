// utils/formatters.js
export const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };
  
  export const getLevelColor = (level) => {
    switch (level) {
      case "Information":
        return "bg-blue-100 text-blue-800";
      case "Warning":
        return "bg-yellow-100 text-yellow-800";
      case "Error":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  
  