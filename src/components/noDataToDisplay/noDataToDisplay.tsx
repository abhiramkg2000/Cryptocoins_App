import "./noDataToDisplay.scss";

export default function NoDataToDisplay({
  text = "No Data to display",
  absolute = false,
}: {
  text?: string;
  absolute?: boolean;
}) {
  return (
    <div className={`no-data-to-display ${absolute ? "absolute" : ""}`}>
      {text}
    </div>
  );
}
