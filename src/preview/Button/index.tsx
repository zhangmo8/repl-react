import "./index.css"

const Button = ({
  children,
  ...props
}: React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>) => (
  <button className="playground-button" type="button" {...props}>
    {children}
  </button>
)

export default Button
