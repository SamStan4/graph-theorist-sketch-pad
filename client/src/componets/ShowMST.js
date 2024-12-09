import ToggleSwitch from "./SmallComponents/ToggleSwitch.js"

const ShowMST = ({ onToggle }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "10px",
      }}
    >
      <p
        style={{
          margin: "0px"
        }}
      >
        Show MST?
      </p>
      <ToggleSwitch onToggle={onToggle}/>
    </div>
  )
}

export default ShowMST;