import { toast } from "react-hot-toast";
import CustomDeleteToast from "./CustomToast.jsx";

// Function to trigger the custom delete confirmation toast
function triggerDeleteToast(
  item = "",
  handleConfirmAction,
  disabledCondition,
  transaction,
) {
  const emptyItem = item === "";
  toast.custom(
    (t) => (
      <CustomDeleteToast
        message={`Are you sure you want to delete ${emptyItem ? transaction : item}?`}
        onConfirm={() => {
          handleConfirmAction(); // Call the function for confirmation
          toast.dismiss(t.id); // Close the toast
        }}
        onCancel={() => toast.dismiss(t.id, { delay: 0 })} // Close the toast on cancel
        disabled={disabledCondition}
      />
    ),
    {
      // Customize the toast container styles
      duration: 1000,
      position: "top-center",
      style: {
        backgroundColor: "transparent", // Ensure no white background is applied
        boxShadow: "none", // Remove any default shadows
        padding: 0, // Ensure no additional padding is applied
      },
    },
  );
}

export default triggerDeleteToast;
