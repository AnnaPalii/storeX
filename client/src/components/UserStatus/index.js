import React from "react";
import useLogRender from "../../utils/useLogPath";

function Head() {
	useLogRender();

	return (
		<nav>
			<h1 className='mt-0 ml-0 mb-3 text-dark p-4 pt-3 pl-3'>List your place and store your stuff with StoreX</h1>
		</nav>
	);
}

export default Head;
