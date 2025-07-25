import { findByIdAndUpdate } from "../../models/studentdashboard/StudentRequest"; // Adjust the path as needed
import StudentRequest from "../../models/studentdashboard/StudentRequest";
router.put("/request/:requestId", authMiddleware, async (req, res) => {
  const { requestId } = req.params;
  const { status } = req.body;
  const { action } = req.body;

  if (!status || !['approved', 'rejected', 'pending', 'completed'].includes(status.toLowerCase())) {
    return res.status(400).json({ error: "Invalid status provided." });
  }

  try {
    const updatedRequest = await findByIdAndUpdate(
      requestId,
      { status: action },
      { new: true }
    );

    if (!updatedRequest) {
      return res.status(404).json({ error: "Student request not found." });
    }

    res.json(updatedRequest);
  } catch (err) {
    console.error('Error updating student request:', err);
    if (err.name === 'CastError') {
      return res.status(400).json({ error: 'Invalid request ID format.' });
    }
    res.status(500).json({ error: "Failed to update request" });
  }
});
