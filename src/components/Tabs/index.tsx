import "./styles.css"

interface Tab {
  label: string
  value: string
}

interface TabsProps {
  tabs: Tab[]
  activeTab: string
  onChange: (value: string) => void
}

const Tabs = ({ tabs, activeTab, onChange }: TabsProps) => {
  return (
    <div className="repl-output-tabs">
      {tabs.map((tab) => (
        <button
          type="button"
          key={tab.value}
          className={`repl-tab-button ${activeTab === tab.value && "active"}`}
          onClick={() => onChange(tab.value)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}

export default Tabs
