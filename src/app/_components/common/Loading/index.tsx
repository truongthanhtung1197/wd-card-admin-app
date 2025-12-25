import React, { memo } from "react";

import { Spinner } from "@nextui-org/react";

const Loading = memo(() => {
  return (
    <div className="row gap-5">
      <Spinner size="lg" color="danger" />
      <p className="text-lg font-medium">Loading</p>
    </div>
  );
});

export default Loading;
