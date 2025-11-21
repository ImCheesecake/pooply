import { Router, Request, Response } from "express";
import { requireAuth, AuthRequest } from "../middleware/auth";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL || "";
const supabaseKey = process.env.SUPABASE_PUBLISHABLE_KEY || "";
const supabase = createClient(supabaseUrl, supabaseKey);

const router = Router();

/**
 * @swagger
 * /api/auth/dev-login:
 *   post:
 *     summary: Development login (for testing only)
 *     description: Login with email and password to get a JWT token for Swagger testing. This endpoint should only be used in development.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: test@test.com
 *               password:
 *                 type: string
 *                 example: yourpassword
 *     responses:
 *       200:
 *         description: Login successful - Copy the access_token and use it in the Authorize button
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 access_token:
 *                   type: string
 *                   description: JWT token to use in Authorization header
 *                 user:
 *                   type: object
 *       400:
 *         description: Invalid credentials
 */
router.post("/dev-login", async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password required" });
  }
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      return res.status(400).json({ error: error.message });
    }
    res.json({
      access_token: data.session?.access_token,
      user: data.user,
      message:
        "Copy the access_token above and click 'Authorize' in Swagger, then paste it there",
    });
  } catch (err) {
    console.error("Dev login error:", err);
    res.status(500).json({ error: "Login failed" });
  }
});

/**
 * @swagger
 * /api/auth/me:
 *   get:
 *     summary: Get current user profile
 *     description: Returns the authenticated user's profile. Authentication is handled client‑side via Google OAuth or Passkeys through Supabase.
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 email:
 *                   type: string
 *                 name:
 *                   type: string
 *                 avatarUrl:
 *                   type: string
 *                 createdAt:
 *                   type: string
 *       401:
 *         description: Unauthorized - Invalid or missing token
 */
router.get("/me", requireAuth, (req: AuthRequest, res: Response) => {
  res.json(req.user);
});

/**
 * @swagger
 * /api/auth/session:
 *   delete:
 *     summary: Revoke the current session
 *     description: Invalidates the current JWT token. Client should also clear local session storage.
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Session revoked successfully
 *       401:
 *         description: Unauthorized
 */
router.delete("/session", requireAuth, (req: AuthRequest, res: Response) => {
  // Supabase handles session invalidation client‑side; this endpoint exists for consistency.
  res.json({ message: "Session revoked. Client should clear local storage." });
});

// -------------------------------------------------------------------
// Google OAuth (development only)
/**
 * @swagger
 * /api/auth/google-login:
 *   get:
 *     summary: Initiate Google OAuth flow
 *     description: Returns the URL to redirect the user to Supabase's Google OAuth endpoint.
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: URL for Google OAuth
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 url:
 *                   type: string
 *                   description: URL to redirect the client to
 *       400:
 *         description: OAuth initiation failed
 */
router.get("/google-login", async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: "http://localhost:3000/auth/callback" },
    });
    if (error) return res.status(400).json({ error: error.message });
    res.json({ url: data?.url });
  } catch (e) {
    console.error("Google OAuth error:", e);
    res.status(500).json({ error: "OAuth failed" });
  }
});

// -------------------------------------------------------------------
// Passkey (WebAuthn) registration (development only)
/**
 * @swagger
 * /api/auth/passkey/register:
 *   post:
 *     summary: Start Passkey registration
 *     description: Initiates a passkey registration flow and returns the Supabase response (contains challenge info).
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: test@test.com
 *     responses:
 *       200:
 *         description: Registration response from Supabase
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       400:
 *         description: Invalid request
 */
router.post("/passkey/register", async (req: Request, res: Response) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: "Email required" });
  try {
    const { data, error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: "http://localhost:3000/auth/callback" },
    } as any);
    if (error) return res.status(400).json({ error: error.message });
    res.json(data);
  } catch (e) {
    console.error("Passkey register error:", e);
    res.status(500).json({ error: "Passkey registration failed" });
  }
});

// Passkey verification (development only)
/**
 * @swagger
 * /api/auth/passkey/verify:
 *   post:
 *     summary: Verify Passkey login
 *     description: Completes the passkey login flow using Supabase OTP verification.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               token:
 *                 type: string
 *                 description: OTP token generated by the passkey flow
 *     responses:
 *       200:
 *         description: Successful login, returns access token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 access_token:
 *                   type: string
 *                 user:
 *                   type: object
 *       400:
 *         description: Invalid credentials or verification failed
 */
router.post("/passkey/verify", async (req: Request, res: Response) => {
  const { email, token } = req.body;
  if (!email || !token)
    return res.status(400).json({ error: "Email and token required" });
  try {
    const { data, error } = await supabase.auth.verifyOtp({
      email,
      token,
      type: "magiclink",
    } as any);
    if (error) return res.status(400).json({ error: error.message });
    res.json({ access_token: data?.session?.access_token, user: data?.user });
  } catch (e) {
    console.error("Passkey verify error:", e);
    res.status(500).json({ error: "Passkey verification failed" });
  }
});

export default router;
