import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis } from 'recharts';

const Newchart = ({ position }) => {
	const [data, setData] = useState([]);
	const [tempArr, setTemp] = useState([]);
	const fetchData = async () => {
		const data = await fetch(
			`${process.env.REACT_APP_API_URL}/onecall?lat=${position.latitude}&lon=${position.longitude}&exclude=current,minutely,daily,alerts&appid=${process.env.REACT_APP_API_KEY}`,
		);
		const final = await data.json();

		return final.hourly
			.filter((hour, i) => i < 12)
			.map((data, i) => {
				const dateObject = new Date(data.dt * 1000);
				return {
					name: dateObject.toLocaleString('en-US', { hour: 'numeric' }),
					temp: parseInt((data.temp - 273.15).toFixed(0)),
				};
			});
	};

	useEffect(() => {
		const merge = async () => {
			const fetchedData = await fetchData();
			setData(fetchedData);
			setTemp([fetchedData.map((data) => data.temp)]);
		};
		merge(); // eslint-disable-next-line
	}, []);
	return (
		<LineChart width={600} height={300} data={data}>
			<Line
				type='monotone'
				dataKey='temp'
				stroke='#ffffff'
				strokeWidth={3}
				dot={false}
			/>

			<XAxis dataKey='name' stroke='#ffffff' />
			<YAxis domain={[Math.min(tempArr), Math.max(tempArr)]} stroke='#ffffff' />
		</LineChart>
	);
};

export default Newchart;
