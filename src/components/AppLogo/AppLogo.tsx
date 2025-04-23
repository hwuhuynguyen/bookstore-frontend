import React from "react";
import { Link } from "react-router-dom";

function AppLogo() {
	return (
		<Link
			className={`select-none flex flex-col items-center justify-center out-line-orange-100 out-line-4`}
			to="/"
		>
			<h1
				className={`text-primary-dark font-encode py-3 font-medium text-2xl drop-shadow-lg `}
			>
				GraduationStore
			</h1>
		</Link>
	);
}

export default AppLogo;
