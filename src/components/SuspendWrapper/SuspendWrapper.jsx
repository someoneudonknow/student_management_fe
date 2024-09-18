import { Suspense } from "react";

const SuspendWrapper = ({ children, ...rest }) => {
  return <Suspense {...rest}>{children}</Suspense>;
};

export default SuspendWrapper;
