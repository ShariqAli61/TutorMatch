// // Controllers/TeacherDashboard/requestController.js
// import Booking from '../../models/studentdashboard/Booking.js';

// export const handleBookingRequest = async (req, res) => {
//   const { bookingId } = req.params;
//   const { action } = req.body;

//   try {
//     const booking = await Booking.findById(bookingId);

//     if (!booking) {
//       return res.status(404).json({ error: 'Booking not found' });
//     }

//     if (!['accepted', 'rejected'].includes(action)) {
//       return res.status(400).json({ error: 'Invalid action' });
//     }

//     booking.status = action;
//     await booking.save();

//     res.status(200).json({ message: `Booking ${action} successfully`, booking });
//   } catch (error) {
//     console.error('Error updating booking status:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };



// requestController.js
import Booking from '../../models/studentdashboard/Booking.js';

export const handleBookingRequest = async (req, res) => {
  const { bookingId } = req.params;
  const { action } = req.body;

  try {
    const booking = await Booking.findById(bookingId).populate('studentId', 'name');

    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    if (!['accepted', 'rejected'].includes(action)) {
      return res.status(400).json({ error: 'Invalid action' });
    }

    booking.status = action;
    await booking.save();

    res.status(200).json({
      message: `Booking ${action} successfully`,
      booking: {
        _id: booking._id,
        studentName: booking.studentId.name,
        status: booking.status,
        subjects: booking.subjects,
        message: booking.message,
      },
    });
  } catch (error) {
    console.error('Error updating booking status:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

