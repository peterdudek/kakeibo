import React from "react";
import "./style.css";

export function Table({ children }) {
	return (
		<div 
		className="scrollable"
		>
		<table className=
		"table table-dark table-striped border-top-0 text-center text-break tableRound"
		// "table"
		>
			<tbody className="border-top-0">
				{children}
			</tbody>
		</table>
		</div>
	);
}

export function Tr(props) {
	return <tr {...props} >{props.children}</tr>;
}

export function Td({ children }) {
	return <td className="border-top-0">{children}</td>;
}

export default Table;
