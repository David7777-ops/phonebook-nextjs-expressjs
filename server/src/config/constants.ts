export const PHONE_REGEX = new RegExp(
  /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
);

export const BASE_SUCCESS_OBJECT = {
  success: true,
  message: "Success",
};
