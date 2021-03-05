import {useEffect, useState} from 'react'
import {useParams} from 'react-router'
import {getSong, getSongFeatures} from '../spotify-api'
import {cleaner} from './utils'

import {Bar} from 'react-chartjs-2';


const Song = () => 
{
	const {id} = useParams()
	const [features, setFeatures] = useState([0, 0, 0, 0, 0, 0, 0])
	const [song, setSong] = useState(null)

	const feats = {
		labels: ['Danceability', 'Acousticness', 'Energy', 'Instrumentalness', 'Liveness', 'Valence', 'Speechiness'],
		datasets: [
			{
				label: 'Track Properties',
				backgroundColor: [
			        'rgba(255, 99, 132, 0.2)',
			        'rgba(54, 162, 235, 0.2)',
			        'rgba(255, 206, 86, 0.2)',
			        'rgba(75, 192, 192, 0.2)',
			        'rgba(153, 102, 255, 0.2)',
			        'rgba(255, 159, 64, 0.2)',
			        '#12984370'
			      ],

			    borderColor: [
			        'rgba(255, 99, 132, 1)',
			        'rgba(54, 162, 235, 1)',
			        'rgba(255, 206, 86, 1)',
			        'rgba(75, 192, 192, 1)',
			        'rgba(153, 102, 255, 1)',
			        'rgba(255, 159, 64, 1)',
			        '#129843'
			      ],
				borderWidth: 1,
				hoverBackgroundColor: 'rgba(255,99,132,0.4)',
				hoverBorderColor: 'rgba(255,99,132,1)',
				barThickness: 40,
				data: [features.danceability*100, features.acousticness*100, features.energy*100, features.instrumentalness*100, features.liveness*100, features.valence*100, features.speechiness*100]
			}
		]
	}

	const legends = [
		{name: 'Danceability', description:	'Danceability describes how suitable a track is for dancing. '},
		{name: 'Acousticness', description:	'High value represents high confidence that the track is acoustic.'},
		{name: 'Energy', description:	'Energy represents a perceptual measure of intensity and activity. Typically, energetic tracks feel fast, loud, and noisy.'},
		{name: 'Instrumentalness', description:	'Predicts whether a track contains no vocals. “Ooh” and “aah” sounds are treated as instrumental in this context. Rap or spoken word tracks are clearly “vocal”. High value represents the greater likelihood the track contains no vocal content.'},
		{name: 'Liveness', description:	'Detects the presence of an audience in the recording. Higher liveness values represent an increased probability that the track was performed live.'},
		{name: 'Valence', description:	'A measure of the musical positiveness conveyed by a track. Tracks with high valence sound more positive (e.g. happy, cheerful, euphoric), while tracks with low valence sound more negative (e.g. sad, depressed, angry).'},
		{name: 'Speechiness', description:	'Speechiness detects the presence of spoken words in a track. The more exclusively speech-like the recording (e.g. talk show, audio book, poetry), the higher the attribute value. '}
	]


	const options = {
		maintainAspectRatio: false,

	 	scales: {
	        xAxes: [{
	            gridLines: {
	                color: "black",
	            },
	        }],
	        yAxes: [{
	            gridLines: {
	                color: "black",
	            },   
	            ticks:{min: 0, max: 100}
	        }]}
	    }


	useEffect(() => 
	{
		getSong(id).then(res => setSong(res.data))
		getSongFeatures(id).then(res => setFeatures(res.data))

	}, [id])



	return (
		<div className='py-24 px-3 lg:px-12'>
			{song && features ? 
				<div>
					<div className='flex items-start'>
						<div className='w-3/12'>
							<img src={song.album.images[1].url} alt="album" className='object-cover w-full'/>
						</div>
						<div className='ml-4 w-9/12'>
							<h2 className='text-white text-lg lg:text-4xl'>{song.name}</h2>
							<h4 className='text-gray-600 text-base lg:text-2xl mt-1 truncate'>{cleaner(song.artists)} ⋄ {song.album.name}</h4>							
							<a className='mt-3 text-xs md:text-sm inline-block rounded-full px-2 md:px-3 bg-spotify text-white py-1 md:py-2' href={song.external_urls.spotify} target="_blank" rel="noreferrer">Play on Spotify</a>
						</div>
					</div>

					<div className="graph mt-16 w-full">
						<h3 className='text-2xl heading mb-8'>Track Features</h3>
						<div className=''>
							<Bar 
								width={700}
								height={400}
								data={feats} 
								options={options}
							/>
						</div>
						<div className='mt-16 '>
							<h3 className='text-2xl heading mb-5'>Features Description</h3>
							{legends.map(legend => 
								<div className=' mb-6' key={legend.name}>
									<h3 className='text-gray-300'>{legend.name}</h3>
									<p className='text-gray-700'>{legend.description}</p>
								</div>
							)}
								
						</div>
					</div>

				</div>
				: 
				<div className='loader' />
			}
		</div>
	)
}

export default Song



/*----------  


key	int	The key the track is in. Integers map to pitches using standard Pitch Class notation. E.g. 0 = C, 1 = C♯/D♭, 2 = D, and so on.
mode	int	Mode indicates the modality (major or minor) of a track, the type of scale from which its melodic content is derived. Major is represented by 1 and minor is 0.


time_signature	int	An estimated overall time signature of a track. The time signature (meter) is a notational convention to specify how many beats are in each bar (or measure).
*loudness	float	The overall loudness of a track in decibels (dB). Loudness values are averaged across the entire track and are useful for comparing relative loudness of tracks. Loudness is the quality of a sound that is the primary psychological correlate of physical strength (amplitude). Values typical range between -60 and 0 db.
*tempo	float	The overall estimated tempo of a track in beats per minute (BPM). In musical terminology, tempo is the speed or pace of a given piece and derives directly from the average beat duration.

  ----------*/
