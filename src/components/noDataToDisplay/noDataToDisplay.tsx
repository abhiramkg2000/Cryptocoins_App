import "./noDataToDisplay.scss";

export default function NoDataToDisplay({
  text = "No Data to display",
  absolute = false,
}: {
  text?: string;
  absolute?: boolean;
}) {
  return (
    <div className={`no_data_to_display ${absolute ? "absolute" : ""}`}>
      {text}
    </div>
  );
}
