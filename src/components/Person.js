import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { getPersonInfoQuery } from '../queries/queries';

export const Person = ({ name, gender, height }) => (
	<div>
		<h2>{name}</h2>
		<p>Gender: {gender}</p>
		<p>Height: {height}</p>
	</div>
);
