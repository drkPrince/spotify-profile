import {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import {headers, getAPodcast} from '../../spotify-api'
import {convertMS} from '../utils'
import {useInView} from 'react-intersection-observer'
import axios from 'axios'

const Podcast = () => 
{
	const {ref, inView} = useInView()
	const [next, setNext] = useState(null)

	const {id} = useParams()
	const [pod, setPod] = useState(null)
	const [eps, setEps] = useState(null)

	useEffect(() => 
	{
		getAPodcast(id).then(res => {
			setEps(res.data.episodes.items)
			setNext(res.data.episodes.next)
			setPod(res.data)
		})
	}, [id])

	useEffect(() => {
		if(inView && next){
			axios.get(next, {headers})
			.then(res => {
				setEps(eps.concat(res.data.items))
				setNext(res.data.next)
			})
		}
	}, [inView, eps, next])

	return (
		<div className=''>
			{pod ?
				<div>
					<div className=''>
						<div className='w-40 rounded-full overflow-hidden mx-auto'>
							<img src={pod.images[1].url} alt="podcast" className='object-cover'/>
						</div>
						<div className='text-center mt-3'>
							<h3 className='text-white text-lg lg:text-4xl truncate'>{pod.name}</h3>
							<h4 className='text-gray-700'>{pod.publisher} ⋄ {pod.total_episodes} episodes</h4>
						</div>
					</div>

					<p className='text-gray-600 leading-loose mt-6'>
						{pod.description}
					</p>

					<div className='w-full mt-8'>
						<div className='flex justify-between text-gray-700 mb-6 text-left sticky top-0 pt-8 bg-black border-bottom w-full z-50' >
							<h3 className='w-10/12 lg:w-7/12'>EPISODE</h3>
							<h3 className='hidden lg:block w-2/12'>RELEASED</h3>
							<h3 className='hidden lg:block w-2/12'>DURATION</h3>
							<h3 className='w-2/12 lg:1/12'>PLAY</h3>
						</div>

						{eps.map(ep => 
							<div className='text-gray-500 flex py-4' key={ep.id}>
								<div className='w-10/12 lg:w-7/12'>
									{ep.name}
								</div>
								<div className='hidden lg:block w-2/12'>{ep.release_date}</div>
								<div className='hidden lg:block w-2/12'>{convertMS(ep.duration_ms)}</div>
								<div className='w-2/12 lg:1/12'>
									<a href={ep.external_urls.spotify} target='blank'>
										<svg className='transform hover:scale-150 transition-transform duration-300' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path className='fill' d="M0 0h24v24H0z"/><path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM10.622 8.415l4.879 3.252a.4.4 0 0 1 0 .666l-4.88 3.252a.4.4 0 0 1-.621-.332V8.747a.4.4 0 0 1 .622-.332z" className='fill-current'/></svg>
									</a>
								</div>
							</div>
						)}
					</div>
					{ next && <div ref={ref} className='text-center text-2xl text-gray-700 py-8'>Hang on, loading more episodes...</div>}
				</div>
			: <div className='loader'>Loading, Please Wait</div>
		}
		</div>
	)
}

export default Podcast