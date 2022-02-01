import Swal from "sweetalert2";

const Alert = () => {
  const sweetAlert = (icon, title, text, showConfirm) => {
    Swal.fire({
      icon: icon,
      title: title,
      text: text,
      timer: 2000,
      showConfirmButton: showConfirm,
    });
  };

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });
  const fireToast = (icon, title) => {
    Toast.fire({
      icon: icon,
      title: title,
    });
  };

  return { sweetAlert, fireToast };
};

export default Alert;
