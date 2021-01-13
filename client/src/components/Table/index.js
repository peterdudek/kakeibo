import React from "react";
import "./style.css";

export function Table({ children }) {
	return (
		<table className=" table table-dark table-striped text-center text-break tableRound">
			<tbody>
				{children}
			</tbody>
		</table>
	);
}

export function Tr(props) {
	return <tr {...props} >{props.children}</tr>;
}

export function Td({ children }) {
	return <td >{children}</td>;
}

export default Table;
