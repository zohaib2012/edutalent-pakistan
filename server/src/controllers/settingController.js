const Setting = require('../models/Setting');
const Phase = require('../models/Phase');

const defaultSettings = {
  general: {
    websiteName: 'EduTalent Pakistan',
    tagline: 'Empowering Young Minds',
    contactEmail: 'info@edutalent.pk',
    contactPhone: '+92 300 1234567',
    headOffice: 'Office #12, 3rd Floor, ABC Plaza, Blue Area, Islamabad, Pakistan',
  },
  test: {
    timePerQuestion: 60,
    maxQuestions: 100,
    maxCheatViolations: 5,
  },
  email: {
    smtpHost: '',
    smtpPort: '587',
    smtpUser: '',
    smtpPass: '',
  },
};

exports.getAll = async (req, res) => {
  try {
    const settings = await Setting.find();
    const phases = await Phase.find().select('name fee slug isActive');

    const grouped = { general: {}, test: {}, email: {}, phases: [] };

    settings.forEach((s) => {
      if (grouped[s.category]) {
        grouped[s.category][s.key] = s.value;
      }
    });

    Object.keys(defaultSettings).forEach((cat) => {
      Object.keys(defaultSettings[cat]).forEach((key) => {
        if (grouped[cat][key] === undefined) {
          grouped[cat][key] = defaultSettings[cat][key];
        }
      });
    });

    grouped.phases = phases.map((p) => ({
      _id: p._id,
      name: p.name,
      slug: p.slug,
      fee: p.fee,
      isActive: p.isActive,
    }));

    res.json({ success: true, data: grouped });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const { category, settings } = req.body;

    if (!category || !settings) {
      return res.status(400).json({ success: false, message: 'category and settings are required' });
    }

    const validCategories = ['general', 'test', 'email'];
    if (category === 'phases') {
      return res.status(400).json({ success: false, message: 'Use /settings/phases endpoint for phase fees' });
    }
    if (!validCategories.includes(category)) {
      return res.status(400).json({ success: false, message: 'Invalid category' });
    }

    const ops = Object.entries(settings).map(([key, value]) => ({
      updateOne: {
        filter: { key },
        upsert: true,
        update: { key, value, category },
      },
    }));

    await Setting.bulkWrite(ops);

    res.json({ success: true, message: `${category} settings updated` });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updatePhaseFees = async (req, res) => {
  try {
    const { phases } = req.body;

    if (!Array.isArray(phases)) {
      return res.status(400).json({ success: false, message: 'phases array is required' });
    }

    const ops = phases.map((p) => ({
      updateOne: {
        filter: { _id: p._id },
        update: { fee: p.fee },
      },
    }));

    await Phase.bulkWrite(ops);

    res.json({ success: true, message: 'Phase fees updated' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
