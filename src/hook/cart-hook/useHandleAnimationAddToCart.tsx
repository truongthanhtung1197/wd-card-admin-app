import { useRef } from "react";

export const useHandleAnimationAddToCart = () => {
  const imgRef = useRef<HTMLImageElement | null>(null);

  const triggerAnimation = () => {
    const cart = document.getElementById("header-cart-icon");
    if (!cart) return;

    const startRect = imgRef.current?.getBoundingClientRect();
    if (!startRect) return;

    const productImage = new Image();
    productImage.src = imgRef.current?.src || "";
    productImage.style.position = "fixed";
    productImage.style.width = `${imgRef.current?.offsetWidth || 100}px`;
    productImage.style.height = `${imgRef.current?.offsetHeight || 100}px`;
    productImage.style.left = `${startRect.left}px`;
    productImage.style.top = `${startRect.top}px`;
    productImage.style.zIndex = "1000";
    productImage.style.borderRadius = "100%";
    productImage.style.objectFit = "contain";
    productImage.style.objectPosition = "center";
    productImage.style.overflow = "hidden";
    productImage.style.pointerEvents = "none";

    document.body.appendChild(productImage);

    const endRect = cart.getBoundingClientRect();
    const deltaX = endRect.left - startRect.left;
    const deltaY = endRect.top - startRect.top;

    productImage.animate(
      [
        {
          transform: "translate(0, 0) scale(0.5) rotate(0deg)",
          opacity: 1,
          offset: 0,
        },
        {
          transform: "translate(-4px, 0) scale(1) rotate(-5deg)",
          opacity: 1,
          offset: 0.05,
        },
        {
          transform: "translate(4px, 0) scale(1.5) rotate(5deg)",
          opacity: 1,
          offset: 0.1,
        },
        {
          transform: "translate(-2px, 0) scale(1.3) rotate(-3deg)",
          opacity: 1,
          offset: 0.15,
        },
        {
          transform: "translate(2px, 0) scale(1) rotate(3deg)",
          opacity: 1,
          offset: 0.2,
        },
        {
          transform: "translate(0, 0) scale(0.5) rotate(0deg)",
          opacity: 0.5,
          offset: 0.25,
        },
        {
          transform: `translate(${deltaX * 0.35}px, ${deltaY * 0.1}px) scale(0.3) rotate(15deg)`,
          opacity: 0.5,
          offset: 0.6,
        },
        {
          transform: `translate(${deltaX}px, ${deltaY}px) scale(0.1) rotate(0deg)`,
          opacity: 0,
          offset: 1,
        },
      ],
      {
        duration: 2000,
        easing: "ease-in-out",
      },
    );

    setTimeout(() => {
      productImage.remove();
    }, 2000);
  };

  const Element = () => {
    return (
      <div className="relative">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={imgRef}
          src={"/images/seo.png"}
          alt={"product.name"}
          className="pointer-events-none absolute left-0 top-0 h-[100px] w-[100px] opacity-0"
        />
      </div>
    );
  };

  return { triggerAnimation, Element };
};
