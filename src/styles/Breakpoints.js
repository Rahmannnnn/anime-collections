function mq(minWidth) {
  switch (minWidth) {
    case "xs":
      return `@media screen and (min-width: 0px)`;
    case "sm":
      return `@media screen and (min-width: 576px)`;
    case "md":
      return `@media screen and (min-width: 768px)`;
    case "lg":
      return `@media screen and (min-width: 992px)`;
    case "xl":
      return `@media screen and (min-width: 1200px)`;
    case "xxl":
      return `@media screen and (min-width: 1400px)`;
    case "xxxl":
      return `@media screen and (min-width: 1920px)`;
    default:
      return `@media screen and (min-width: 0px)`;
  }
}

export { mq };
