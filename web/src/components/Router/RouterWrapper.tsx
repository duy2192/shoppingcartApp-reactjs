import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface RouterWrapperProps {
  children: JSX.Element;
}

export const RouterWrapper = ({ children }: RouterWrapperProps) => {
  const location = useLocation();
  useLayoutEffect(() => {
    document.documentElement.scrollTo(0, 0);
  }, [location.pathname]);
  return children;
};
