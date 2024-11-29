import ToggleSwitch from "./SmallComponents/ToggleSwitch"

const ShowBridges = ({ onToggle }) => {
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
        Show bridges?
      </p>
      <ToggleSwitch onToggle={onToggle}/>
    </div>
  )
}

export default ShowBridges;