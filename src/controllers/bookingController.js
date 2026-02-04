const Booking = require('../models/Booking');
const sendEmail = require('../utils/sendEmail');

// @desc    Create new booking
// @route   POST /api/bookings
// @access  Public
exports.createBooking = async (req, res, next) => {
  try {
    const booking = await Booking.create(req.body);

    // Send email to admin
    const emailMessage = `
      New booking request received!
      Ticket Number: ${booking.ticketNumber}
      Client Name: ${booking.clientName}
      Organization: ${booking.organization || 'N/A'}
      Phone: ${booking.phone}
      Email: ${booking.email}
      Request Type: ${booking.requestType}
      Details: ${booking.details || 'No details provided'}
    `;

    try {
      await sendEmail({
        email: process.env.ADMIN_EMAIL,
        subject: `New Booking Request - ${booking.ticketNumber}`,
        message: emailMessage,
      });
    } catch (err) {
      console.error('Email could not be sent');
    }

    res.status(201).json({
      success: true,
      data: booking,
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// @desc    Get all bookings
// @route   GET /api/bookings
// @access  Private/Admin
exports.getBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find().populate('relatedProduct');
    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings,
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// @desc    Update booking status
// @route   PATCH /api/bookings/:id/status
// @access  Private/Admin
exports.updateBookingStatus = async (req, res, next) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true, runValidators: true }
    );

    if (!booking) {
      return res.status(404).json({ success: false, error: 'Booking not found' });
    }

    res.status(200).json({
      success: true,
      data: booking,
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};
