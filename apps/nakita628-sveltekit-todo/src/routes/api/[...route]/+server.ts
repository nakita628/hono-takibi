import app from '../../..';
import type { RequestHandler } from './$types';


export const GET: RequestHandler = ({ request }) => app.fetch(request);