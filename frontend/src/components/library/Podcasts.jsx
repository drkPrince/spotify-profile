import {useState, useEffect} from 'react'

import {getUsersPodcasts} from '../../spotify-api'
import {DoubleCard} from '../utils'
import {Link} from 'react-router-dom'

const Podcasts = () => {

	const [podcasts, setPodcasts] = useState(null)


	useEffect(() => 
	{
		getUsersPodcasts().then(res => setPodcasts(res.data))
	}, [])

	return (
		<div>
			<h3 className='text-2xl heading'>Your Podcasts</h3>
			{podcasts ? 
				<div className='grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-5'>
					{podcasts.items.map(pod => 
						<Link to={`/library/podcasts/${pod.show.id}`} key={pod.id}>
							<DoubleCard itemName={pod.show.name} imageURL={pod.show.images[1].url} subItem={pod.show.publisher}/>
						</Link>
					)}
					
				</div>
			: <div className='loader'>Loading, Please Wait</div>}
			
		</div>
	)
}

export default Podcasts