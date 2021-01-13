import React from "react";
import useLogRender from "../../utils/useLogPath";
import "./style.css";

function Nav() {
	useLogRender();

	return (
		<nav>
			<h1 className='mt-0 ml-0 mb-3 text-dark p-4 pt-3 pl-3 kakeiboFont'>Kakeibo 家計簿</h1>
		</nav>
		// <div className="d-flex justify-content-between">
		// 	<div><h1 className="kakeiboFont">Kakeibo</h1></div>
		// 	<div><h1>家計簿</h1></div>
		// </div>
	);
}

export default Nav;
