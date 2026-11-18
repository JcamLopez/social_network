import type { Request, Response } from 'express'
import { asyncHandler } from '../utils/asyncHandler.utils.js'
import { getAuthUser } from '../utils/request.util.js'
import { createPublication, deletePublication, getAllPublications, updatePublication } from '../services/publication.services.js'
import type { PublicationIdDTO } from '../schemas/publication.schema.js'
import type { paginationQueryDTO } from '../schemas/pagination.schema.js'

export const createPublicationHandler = asyncHandler(async (req: Request, res: Response) => {
    const { email } = getAuthUser(req)
    await createPublication(req.body, email)
    res.status(201).json({ succes: true, message: 'Publicación creada' })
})

export const getPublicationsHandler = asyncHandler(async (req: Request, res: Response) => {
    const publications = await getAllPublications(req.query as unknown as paginationQueryDTO)
    res.status(200).json({ succes: true, message: 'Publicaciones consultadas', publications })
})

export const updatePublicationHandler = asyncHandler(async (req: Request, res: Response) => {
    const { email } = getAuthUser(req)
    const publication = await updatePublication(req.params as unknown as PublicationIdDTO, req.body, email)
    res.status(200).json({ succes: true, message: 'Publicación actualizada', publication })
})

export const deletePublicationHandler = asyncHandler(async (req: Request, res: Response) => {
    const { email } = getAuthUser(req)
    const publication = await deletePublication(req.params as unknown as PublicationIdDTO, email)
    res.status(200).json({ succes: true, message: 'Publicación eliminada', publication })
})
