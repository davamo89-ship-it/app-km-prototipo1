import { Router } from 'express';

import type { Environment } from '../config/environment.js';
import { StravaOAuthController } from '../controllers/strava_oauth_controller.js';
import { StravaOAuthService } from '../services/strava/strava_oauth_service.js';

export function createStravaRouter(
  environment: Environment,
): Router {
  const router = Router();

  const oauthService =
    new StravaOAuthService(environment);

  const oauthController =
    new StravaOAuthController(oauthService);

  router.post(
    '/oauth/exchange',
    oauthController.exchangeAuthorizationCode,
  );

  router.post(
    '/oauth/refresh',
    oauthController.refreshAccessToken,
  );

  return router;
}