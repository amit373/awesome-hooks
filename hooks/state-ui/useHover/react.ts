import { useState, useCallback, useRef, useEffect } from 'react';

/**
 * Track hover state for an element
 * @returns [ref callback to attach to element, isHovered]
 */
export function useHover<T extends HTMLElement = HTMLElement>(): [
  (el: T | null) => void,
  boolean
] {
  const [isHovered, setIsHovered] = useState(false);
  const [node, setNode] = useState<T | null>(null);

  const setRef = useCallback((el: T | null) => {
    setNode(el);
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  useEffect(() => {
    if (!node) return;
    node.addEventListener('mouseenter', handleMouseEnter);
    node.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      node.removeEventListener('mouseenter', handleMouseEnter);
      node.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [node, handleMouseEnter, handleMouseLeave]);

  return [setRef, isHovered];
}
