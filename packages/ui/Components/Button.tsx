type ButtonProps = {
	onClick: () => Promise<void>
}

export const Button = ({onClick}: ButtonProps) => {
	return <button onClick={onClick}>Submit</button>;
};
