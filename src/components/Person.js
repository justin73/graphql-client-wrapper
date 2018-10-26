import React from 'react';

export const Person = ({ name, gender, height }) => (
	<div>
		<h2>{name}</h2>
		<p>Gender: {gender}</p>
		<p>Height: {height}</p>
	</div>
);
