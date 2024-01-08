import express from 'express';
import { ConversationService } from '../services/conversation.service';

const conversationRouter = express.Router();
const conversationService = new ConversationService();

conversationRouter.post('/conversation/request', (req, res) => conversationService.createRequest(req, res));
conversationRouter.get('/conversation/get-all', (req, res) => conversationService.getAllByUser(req, res));
conversationRouter.get('/conversation/get/:id', (req, res) => conversationService.getById(req, res));

export default conversationRouter;
