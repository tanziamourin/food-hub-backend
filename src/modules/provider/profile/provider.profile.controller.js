import { ProviderProfileService } from "./provider.profile.service";
import { updateProviderProfileSchema } from "./provider.profile.validation";
// GET LOGGED-IN PROVIDER PROFILE
export const getProviderProfile = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }
        const profile = await ProviderProfileService.getProfile(req.user.id);
        res.json({
            success: true,
            data: profile,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
// GET ALL PROVIDERS (PUBLIC)
export const getAllProviders = async (req, res) => {
    try {
        const providers = await ProviderProfileService.getAllProviders();
        res.json({
            success: true,
            data: providers,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
// GET PROVIDER BY ID
export const getProvider = async (req, res) => {
    try {
        const { id } = req.params;
        const provider = await ProviderProfileService.getProviderById(req.params.id);
        if (!provider) {
            return res.status(404).json({
                success: false,
                message: "Provider not found",
            });
        }
        res.json({
            success: true,
            data: provider,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
// UPDATE PROFILE
export const updateProviderProfile = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }
        const parsed = updateProviderProfileSchema.parse({
            ...req.body,
            logo: req.file ? req.file.path : req.body.logo,
        });
        const profile = await ProviderProfileService.updateProfile(req.user.id, parsed);
        res.json({
            success: true,
            data: profile,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
            details: error.errors,
        });
    }
};
