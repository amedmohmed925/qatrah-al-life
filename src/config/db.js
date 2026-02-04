const mongoose = require('mongoose');

/**
 * استخدام متغير عام لتخزين الاتصال عبر عمليات إعادة التحميل
 * في بيئة التطوير والإنتاج اللاخادمية (Serverless).
 * هذا النمط يمنع تراكم الاتصالات ويحسن الأداء في Vercel وغيرها.
 */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const connectDB = async () => {
  // التحقق من وجود MONGO_URI
  const MONGODB_URI = process.env.MONGO_URI;
  
  if (!MONGODB_URI) {
    throw new Error(
      'Please define the MONGO_URI environment variable in .env file'
    );
  }

  // إذا كان هناك اتصال مسبق، قم بإعادته فوراً
  if (cached.conn) {
    console.log('MongoDB: Using cached connection');
    return cached.conn;
  }

  // إذا لم يكن هناك وعد باتصال جاري، قم بإنشاء وعد جديد
  if (!cached.promise) {
    const opts = {
      // تعطيل التخزين المؤقت لرؤية الأخطاء فوراً في الإنتاج
      bufferCommands: false,
      
      // تحسينات خاصة ببيئة Serverless
      maxPoolSize: 10, // تحديد عدد الاتصالات لتجنب استنفاذ الموارد
      serverSelectionTimeoutMS: 5000, // تقليل وقت انتظار الخادم للفشل السريع
      socketTimeoutMS: 45000, // إغلاق المقابس غير النشطة
      useNewUrlParser: true,
      useUnifiedTopology: true,
      retryWrites: true,
      family: 4,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log(`MongoDB Connected: ${mongoose.connection.host}`);
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null; // إعادة تعيين الوعد للسماح بالمحاولة مرة أخرى
    console.error('MongoDB Connection Error:', e.message);
    throw e;
  }

  return cached.conn;
};

module.exports = connectDB;
