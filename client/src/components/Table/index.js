import React from "react";
import "./style.css";

// const style = {
// 	color: "black"
// }

export function Table({ children }) {
	return (
		<div 
		// style={style} 
		className="scrollable"
		>
		<table 
		// style={style} 
		className=
		// "table table-dark table-striped border-top-0 text-center text-break tableRound"
		"table table-striped"
		>
			<tbody 
			
			// style={style} 
			className="border-top-0">
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
