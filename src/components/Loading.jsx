import React from "react";
import CircularProgress from '@mui/material/CircularProgress';


const Loading = () => {
  return (
    <div className="fixed w-full h-full bg-[#00000067] left-0 top-0 flex items-center justify-center">
      <CircularProgress sx={{ color: "#2a2f3e" }} />
    </div>
  );
};

export default Loading;
